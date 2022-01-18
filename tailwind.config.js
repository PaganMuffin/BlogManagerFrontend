module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'
  ],
  theme: {
    extend: {
        height: {
            100: '25rem',
            104: '26rem',
            108: '27rem',
            116: '29rem',
            120: '30rem',
            124: '31rem',
        },
        minWidth: {
            32:'8rem',
            36:'9rem',
            48:'12rem',
            64:'16rem'
        },
        width:{
            "5xl":"64rem",
            "6xl":"72rem",
        }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
