import './GuestRegistration.css';

const GuestRegistration = () => {
    return(
    <div>
        <div class="container">
        <h2>Guest Registration</h2>
        <form action="/register" method="POST" id="registrationForm">
        <label for="full-name">Full Name:</label>
        <input type="text" id="full-name" name="full-name" required/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required/>

        <label for="contact-number">Contact Number:</label>
        <input type="tel" id="contact-number" name="contact-number" required/>

        <input type="submit" value="Register"/>
        </form>
        </div>
    </div>   
    );
};

export default GuestRegistration;