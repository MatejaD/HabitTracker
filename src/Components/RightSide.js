import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import To_Do from "./To_Do";

export default function RightSide() {


  


  return (
    <div className='flex  justify-evenly gap-4 py-4 items-top ml-4   min-h-0    w-11/12 border-2  border-black '>

      <div className="min-h-screen w-1/4 bg-white">
        <form className="w-full h-12 bg-slate-400"
        >

        </form>
      </div>
      <div className="min-h-screen  w-1/4 bg-white">  <h1>ADD A DAILY TASK</h1>
        <form className="w-full  h-12 bg-slate-400"
        >

        </form>


      </div>


      <To_Do />


      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus aliquam, delectus aspernatur odit facilis unde porro harum quod maxime, voluptate nihil sequi autem consequatur exercitationem accusamus repellendus reiciendis enim blanditiis nisi eius quisquam ea reprehenderit quia. Vero incidunt non earum id veritatis, eveniet exercitationem enim libero, repellat quisquam obcaecati ullam quis? Inventore consectetur hic id voluptatem iusto facere autem repudiandae nisi delectus? Sint nesciunt perspiciatis obcaecati quisquam, et corrupti in ut quia consequuntur facere. Architecto enim laudantium suscipit doloribus. Hic voluptatum possimus odit illo vel eaque quaerat ad pariatur velit voluptatibus similique, nisi deleniti sint culpa esse quo blanditiis magnam libero. Quis qui vel molestias animi, nesciunt dolore explicabo accusamus magni ipsa, quisquam beatae quam laboriosam quidem iusto. A cumque modi mollitia hic veritatis? Ex ipsam iste dolorum, repudiandae earum ullam quaerat voluptatibus similique aperiam, laborum esse quo? Cum atque dignissimos asperiores ullam illo voluptates quae, nesciunt esse sed.</p> */}

    </div>
  )
}
