import { svgService } from '../services/svg.service.js'

export default {
    template: `
       <section class="about-page">
       <h2>Our Team</h2>
       <div class="our-team">
            <div class="card">
                <img src="assets/img/dor-img.jpg">
                <div class="info">
                    <h3>Dor Tayari</h3>
                    <h4> Owner and developer of</h4>
                    <h4>AppSus</h4>
                        <h4>Contact me below</h4>
                </div>
                <div class="icons">
                <a href="https://www.linkedin.com/in/dor-tayari-758605163/"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100000463356100"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Dortayari@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                <a href="https://twitter.com/i/flow/single_sign_on"><i class="fa-brands fa-twitter"></i></a>
                </div>
            </div>
            <div class="card">
                <img src="assets/img/bar-img.jpg">
                <div class="info">
                <h3>Bar Barina</h3>
                    <h4> Owner and developer of</h4>
                        <h4>AppSus</h4>
                        <h4>Contact me below</h4>
                </div>
                <div class="icons">
                <a href="https://www.linkedin.com/in/bar-barina-a6854b23a"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://www.facebook.com/bar.barina.5?mibextid=LQQJ4d"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=BarBarina@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                <a href="https://twitter.com/bar_barina_"><i class="fa-brands fa-twitter"></i></a>
                 </div>
              </div>
            </div>
        </div>
        <div class="our-services">
            <h2><i class="fa-solid fa-gear fa-spin"></i>
            Our services
            <i class="fa-solid fa-gear fa-spin"></i></h2>
            <div class="services">
                <div class="service">
            <div className="icon" v-html="getLogoSvg('gmail')"></div>
            <h2>Gmail</h2>
            <h3>Send emails</h3>
            <h3>Apply for jobs</h3>
            <h3>Talk to friends</h3>
            </div>
            <div class="service">
            <div className="icon" v-html="getLogoSvg('keep')"></div>
            <h2>Keep</h2>
            <h3>Make notes</h3>
            <h3>Write to remember</h3>
            <h3>Keep it close</h3>
            </div>
            <div class="service">
            <div className="icon" v-html="getLogoSvg('books')"></div>
            <h2>Books</h2>
            <h3>Best prices</h3>
            <h3>Books previews</h3>
            <h3>All in one</h3>
            </div>
            </div>
        </div>
       </section>
    `,
    methods: {
        getLogoSvg(iconName) {
            return svgService.getLogoSvg(iconName)
        }
    }
}

    // < h2 > Bar Barina</ >
    //             <p>Web developer and a genius.</p>
    //             <p>BarBarina@gmail.com</p>
