import blessed from 'blessed';
import axios from 'axios';

const screen = blessed.screen({ smartCSR: true, title: 'ReqRunner' });

const output = blessed.box({
  top: 0, left: 0,
  width: '100%', height: '70%',
  border: { type: 'line' },
  scrollable: true, alwaysScroll: true,
  scrollbar: { ch: ' ', track: { bg: 'gray' } },
  tags: true
});

const form = blessed.form({
  parent: screen, top: '70%', left: 0,
  width: '100%', height: '30%'
});
const urlInput = blessed.textbox({
  parent: form, name: 'url',
  inputOnFocus: true,
  top: 0, left: 1, height: 1, width: '80%',
  border: { type: 'line' }
});
const sendBtn = blessed.button({
  parent: form, content: 'Send',
  top: 0, left: '82%', shrink: true,
  padding: { left: 1, right: 1 },
  style: { bg: 'green', focus: { bg: 'red' } }
});

sendBtn.on('press', () => form.submit());
form.on('submit', async (data: any) => {
  const url = data.url as string;
  try {
    const res = await axios.get(url);
    output.setContent(`{green-fg}${JSON.stringify(res.data, null, 2)}{/}`);
  } catch (err: any) {
    output.setContent(`{red-fg}Error: ${err.message}{/}`);
  }
  screen.render();
});

urlInput.focus();
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

screen.append(output);
screen.render();

