// @ts-nocheck

class QuillWindow extends WindowFrame {
  constructor() {
    super({
      title: 'Quill',
      width: 700,
      height: 200,
    });
  }

  show() {
    super.show();
    this.quillTarget = ContentBlock({
      classes: ['quill-editor'],
      children: [TextLabel({ text: 'Hello World' })],
    });
    this.dom.style.background = 'rgba(255, 255, 255, 0.8)';
    this.windowContainer.appendChild(this.quillTarget);
    this.quillEditor = new Quill(this.quillTarget, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button
        ],
      },
    });
  }
}

load('https://cdn.quilljs.com/1.3.6/quill.js');
style('https://cdn.quilljs.com/1.3.6/quill.snow.css');

AppLauncher.register(
  'Quill',
  () => {
    const quill = new QuillWindow();
    quill.show();
  },
  '/Quill/icon.png'
);
