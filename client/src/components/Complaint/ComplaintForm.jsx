import React, {useState} from "react";
import "./ComplaintForm.css"




function ComplaintForm(){
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    };

    
    
    return(
        <div className="complaint-form-container">
            <form className='complaint-form' onSubmit={handleSubmit}>
                {/* <fieldset>
                    <h2> Personal Information </h2>

                    <div className="form-field">
                        <label> First Name </label>
                        <input
                        type = 'text'
                        name = 'firstName'
                        placeholder='First Name'/>
                    </div>
                    
                    <div className="form-field">
                        <label> Last Name </label>
                        <input
                        type = 'text'
                        name = 'lastName'
                        placeholder='Last Name'/>
                    </div>
                    
                    <div className="form-field">
                        <label> MIS </label>
                        <input 
                        type='text'
                        name = 'mis'
                        placeholder='MIS No' />
                    </div>
                    
                    <div className="form-field">
                        <label> Email </label>
                        <input 
                        type='text'
                        name = 'email'
                        placeholder='Email' /> 
                    </div>
                       
                </fieldset> */}

                <fieldset>
                    <h2> Your Complaint </h2>
                    <div className="form-field">
                        <label>What went wrong?</label>
                        <select name="complaint" id="complaint" 
                          //value={category}
                        >
                            <option value="electrical">
                                Electrical
                            </option>

                            <option value="carpentry">
                                Carpentry
                            </option>

                            <option value="cleanliness">
                                Cleanliness
                            </option>

                            <option value="pest-control">
                                Pest Control
                            </option>

                            <option value="plumbing">
                                Plumbing
                            </option>

                            <option value="other">
                                Other(Please specify details)
                            </option>
                        </select>
                    </div>
                
                    <div className="form-field">
                        <label>Details about your complaint</label>
                        <textarea
                            name="details"
                            id="details"
                            rows="10"
                            cols="50"
                            placeholder="Please provide as much detail as possible"
                            //value={details}
                        ></textarea>
                    </div>
                </fieldset>

                <button className='complaint-submit-button' type="submit">
                    Submit Complaint
                </button>
            </form>

        </div>
    );
};

export default ComplaintForm;