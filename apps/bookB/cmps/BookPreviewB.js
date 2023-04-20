export default {
    name: 'bookPreview',
    props: ['book'],
    template: `
            <h2>{{ book.title }}</h2>
            <img :src="book.thumbnail" alt="thumbnail">
            <p>{{ formattedPrice}}</p>
    `,

computed: {
formattedPrice() {
    const { amount, currencyCode } = this.book.listPrice
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount)
  },
}
}