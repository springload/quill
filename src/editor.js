import Delta from 'rich-text/lib/delta';
import Parchment from 'parchment';


class Editor extends Parchment.Container {
  constructor(domNode) {
    // TODO fix?
    if (domNode.innerHTML.indexOf('\n') > -1) {
      domNode.innerHTML = domNode.innerHTML.replace(/\n\s*/g, '');
    }
    super(domNode);
    this.ensureChild();
    this.enable();
    this.delta = this.getDelta();
    this.observer = new MutationObserver((mutations) => {
      this.update(mutations);   // Do not pass additional params from MutationObserver handler
    });
    this.observer.observe(this.domNode, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  applyAttributes(index, length, attr) {
    Object.keys(attr).forEach(function (key) {
      let obj = attr[key];
      let attributor = Parchment.match(key, Parchment.Type.ATTRIBUTE);

      // Only attempt formatting if a valid attributor was found
      if (attributor) {
        this.formatAt(index, length, key, obj)
      }
    }, this)
  }

  applyDelta(delta) {
    delta.ops.reduce((index, op) => {
      if (op.insert != null) {
        if (typeof op.insert === 'string') {
          let length = op.insert.length;

          this.insertAt(index, op.insert);

          // this causes weird errors, not setting the spans correctly
          // therefore another delta.ops.reduce further down...
          //let attr = op.attributes;
          //if (typeof attr === 'object') {
          //  this.applyAttributes(index, length, attr);
          //}

          return index + length;
        } else {
          this.insertAt(index, op.attributes);
          return index + 1;
        }
      } else if (typeof op.delete === 'number') {
        this.deleteAt(index, op.delete);
        return index;
      } else if (typeof op.retain === 'number') {
        Object.keys(op.attributes || {}).forEach((name) => {
          this.formatAt(index, op.retain, name, op.attributes[name]);
        });
        return index + op.retain;
      }
    }, 0);

    // now apply styles. there must be more elegant solution for this?
    delta.ops.reduce((index, op) => {
      if (op.insert != null) {
        if (typeof op.insert === 'string') {
          let length = op.insert.length;
          let attr = op.attributes;
          if (typeof attr === 'object') {
            this.applyAttributes(index, length, attr);
          }
          return index + length;
        } else {
          return index + 1;
        }
      } else if (typeof op.delete === 'number') {
        return index;
      } else if (typeof op.retain === 'number') {
        return index + op.retain;
      }
    }, 0);
  }

  deleteAt(index, length) {
    let [first, firstOffset] = this.children.find(index);
    let [last, lastOffset] = this.children.find(index + length);
    super.deleteAt(index, length);
    if (last != null && first !== last && firstOffset > 0) {
      let lastChild = first.children.tail;
      last.moveChildren(first);
      last.remove();
      if (lastChild != null) {
        lastChild.merge();
      }
    }
    this.ensureChild();
  }

  enable(enabled = true) {
    this.domNode.setAttribute('contenteditable', enabled);
  }

  ensureChild() {
    if (this.children.length === 0) {
      this.appendChild(Parchment.create('block'));
    }
  }

  findPath(index) {
    if (index >= this.getLength()) {
      return [];
    } else {
      return super.findPath(index).slice(1);  // Exclude self
    }
  }

  getDelta() {
    return this.getLines().reduce((delta, child) => {
      return delta.concat(child.getDelta());
    }, new Delta());
  }

  getLines(index = 0, length = this.getLength()) {
    return this.getDescendants(index, length, Parchment.Block);
  }

  onUpdate(delta) { }

  remove() {
    this.children.forEach(function(child) {
      child.remove();
    });
  }

  update(...args) {
    let mutations;
    if (Array.isArray(args[0])) {
      mutations = args[0];
      args = args.slice(1);
    } else {
      mutations = this.observer.takeRecords();
    }
    if (mutations.length === 0) return new Delta();
    let oldDelta = this.delta;
    // TODO optimize
    
    // FF and IE position the cursor incorrectly to the beginning of the editor when editing a paragraph
    // a workaround is to compare the current focus of the editor to the one after building
    var sel = document.getSelection();
    var currentFocus = sel.focusNode;
    var focusOffset = sel.focusOffset;

    this.build();

    if(currentFocus && currentFocus != document.getSelection().focusNode) {
     // now set the old cursor position again
      var range = document.createRange();
      sel.removeAllRanges();
      range.setStart(currentFocus, focusOffset);
      sel.addRange(range);
    }

    this.delta = this.getDelta();
    let change = oldDelta.diff(this.delta);
    if (change.length() > 0) {
      this.onUpdate(change, ...args);
    }
    this.observer.takeRecords();  // Prevent changes from rebuilds
    return change;
  }
}


export { Editor as default };
