let logs = [];

export default {
  onLoad() {
    this.data = this.data || {};
    this.data.debug = !!0;
    this.log(`${this.data.pageName} onLoad`);
  },

  onUnload() {
    this.log(`${this.data.pageName} onUnload`);
  },

  onShow() {
    this.log(`${this.data.pageName} onShow`);
  },

  onHide() {
    this.log(`${this.data.pageName} onHide`);
  },

  onReady() {
    this.log(`${this.data.pageName} onReady`);
  },

  showLogs() {
    console.log(logs.join('\n'));
    dd.alert({
      title: 'logs',
      content: logs.join('\n'),
    });
  },

  clearLogs() {
    logs = [];
  },

  log(str) {
    logs.push(str);
  },
};
