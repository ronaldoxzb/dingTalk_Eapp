Component({
  //mixins:[{ didMount() {}, }],
  data: {
    background: ['blue', 'red', 'yellow'],
    indicatorDots: true,
    autoplay: false,
    vertical: false,
    interval: 1000,
    circular: false,
  },
  // props:{x:1},
  // didUpdate(prevProps,prevData){},
  // didUnmount(){},
  methods: {
    changeIndicatorDots(e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots,
      });
    },
    changeVertical() {
      this.setData({
        vertical: !this.data.vertical,
      });
    },
    changeCircular(e) {
      this.setData({
        circular: !this.data.circular,
      });
    },
    changeAutoplay(e) {
      this.setData({
        autoplay: !this.data.autoplay,
      });
    },
    intervalChange(e) {
      this.setData({
        interval: e.detail.value,
      });
    },
  },
})
