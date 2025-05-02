import blessed from 'blessed';
import { Request } from './Request';
import { HttpClient } from './HttpClient';

export class AppController {
  private screen = blessed.screen({
    smartCSR: true,
    title: 'ReqRunner'
  });

  private output = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: '70%',
    border: { type: 'line' },
    scrollable: true,
    alwaysScroll: true,
    scrollbar: { ch: ' ', track: { bg: 'gray' }, style: { bg: 'white' } },
    tags: true
  });

  private form = blessed.form({
    parent: this.screen,
    top: '70%',
    left: 0,
    width: '100%',
    height: '30%'
  });

  private urlInput = blessed.textbox({
    parent: this.form,
    name: 'url',
    inputOnFocus: true,
    top: 0,
    left: 1,
    height: 1,
    width: '80%',
    border: { type: 'line' }
  });

  private sendBtn = blessed.button({
    parent: this.form,
    content: 'Send',
    top: 0,
    left: '82%',
    shrink: true,
    padding: { left: 1, right: 1 },
    style: { bg: 'green', focus: { bg: 'red' } }
  });

  private client = new HttpClient();

  constructor() {
    // build UI
    this.screen.append(this.output);
    this.screen.append(this.form);
    this.urlInput.focus();

    // wire events
    this.sendBtn.on('press', () => this.form.submit());
    this.form.on('submit', (data: any) => {
      const { url } = data as { url: string };
      this.fetch(url);
    });
    this.screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
  }

  private async fetch(url: string) {
    const req = new Request(url);
    const res = await this.client.send(req);
    this.output.setContent(`{green-fg}${res}{/}`);
    this.screen.render();
  }

  public run() {
    this.screen.render();
  }
}
