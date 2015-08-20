Delta = require('rich-text/lib/delta')
Editor = require('../../../../src/editor')

describe('Formats', ->
  describe('Inline', ->
    it('inner node', ->
      @container.innerHTML = '<p><em>0123</em></p>'
      editor = new Editor(@container)
      editor.formatAt(1, 2, 'bold', true)
      expect(editor.getDelta()).toEqualDelta(new Delta()
        .insert('0', { italic: true })
        .insert('12', { italic: true, bold: true })
        .insert('3', { italic: true })
        .insert('\n')
      )
      expect(@container.innerHTML).toEqualHTML('<p><em>0<strong>12</strong>3</em></p>')
    )

    it('outer node', ->
      @container.innerHTML = '<p><strong>0123</strong></p>'
      editor = new Editor(@container)
      editor.formatAt(1, 2, 'italic', true)
      expect(editor.getDelta()).toEqualDelta(new Delta()
        .insert('0', { bold: true })
        .insert('12', { italic: true, bold: true })
        .insert('3', { bold: true })
        .insert('\n')
      )
      expect(@container.innerHTML).toEqualHTML('\
        <p>\
          <strong>0</strong>\
          <em><strong>12</strong></em>\
          <strong>3</strong>\
        </p>\
      ')
    )

    it('parts of multiple lines', ->
      @container.innerHTML = '\
        <p><em>0123</em></p>\
        <p><em>5678</em></p>\
      '
      editor = new Editor(@container)
      editor.formatAt(2, 5, 'bold', true)
      expect(editor.getDelta()).toEqualDelta(new Delta()
        .insert('01', { italic: true })
        .insert('23', { italic: true, bold: true })
        .insert('\n')
        .insert('56', { italic: true, bold: true })
        .insert('78', { italic: true })
        .insert('\n')
      )
      expect(@container.innerHTML).toEqualHTML('\
        <p><em>01<strong>23</strong></em></p>\
        <p><em><strong>56</strong>78</em></p>\
      ')
    )
  )
)