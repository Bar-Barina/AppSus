export default {
    props: ['book'],
    template: `
    <article class="book-preview">
        <img :src="book.thumbnail">
        <h2>{{ book.title }}</h2>
        <h3>{{ formattedPrice }}</h3>
    </article>
    `,
    computed: {
        formattedPrice() {
            const { amount, currencyCode } = this.book.listPrice
            return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        },
    }
}