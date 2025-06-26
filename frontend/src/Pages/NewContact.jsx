import React from 'react'
import ContactUs from './ContactUs'
import ReviewWrite from '../Components/ReviewWrite'
function NewContact() {
  return (

<div className="tabs tabs-lift flex flex-row items-center justify-around">
  <input type="radio" name="my_tabs_2" className="tab" aria-label="Get in Touch" />
  <div className="tab-content bg-base-100 -300"><ContactUs /></div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="Write Review" defaultChecked />
  <div className="tab-content bg-base-100 "><ReviewWrite /></div>

</div>
  )
}

export default NewContact
