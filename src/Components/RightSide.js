import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_DO, SET_TO_DO_VALUE, REMOVE_TO_DO_ITEM } from "../Redux/actions";

export default function RightSide() {


  const [inputValue, setInputValue] = useState('')

  const To_Do_List = useSelector(state => state.To_Do_List)
  const To_Do_Input_Value = useSelector(state => state.To_Do_Input_Value)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("skrpa")
    dispatch({ type: SET_TO_DO_VALUE, payload: inputValue })
    dispatch({ type: ADD_TO_DO, payload: inputValue })

    setInputValue('')
  }

  console.log(To_Do_List)

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
      <div className="min-h-screen max-h-full  w-1/4 p-2 bg-white">
        <form onSubmit={handleSubmit} className="flex justify-center mb-4  items-center w-full h-12 border-2 rounded-md border-slate-400 bg-slate-400"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-full outline-none px-2 bg-gray-200"
            placeholder="Add a To-Do" type="text" />

        </form>
        <div className="flex flex-col gap-6 min-h-screen p-2  w-full  ">
          {
            To_Do_List.map((item) => {
              return (<div className="relative w-full h-16 border-2 border-black rounded-md">
                <h2>{item.name}</h2>
                <button className="absolute top-1 right-2 text-red-600" onClick={() => dispatch({ type: REMOVE_TO_DO_ITEM, payload: item.id })}>X</button>
              </div>)
            })
          }
        </div>
      </div>




      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus aliquam, delectus aspernatur odit facilis unde porro harum quod maxime, voluptate nihil sequi autem consequatur exercitationem accusamus repellendus reiciendis enim blanditiis nisi eius quisquam ea reprehenderit quia. Vero incidunt non earum id veritatis, eveniet exercitationem enim libero, repellat quisquam obcaecati ullam quis? Inventore consectetur hic id voluptatem iusto facere autem repudiandae nisi delectus? Sint nesciunt perspiciatis obcaecati quisquam, et corrupti in ut quia consequuntur facere. Architecto enim laudantium suscipit doloribus. Hic voluptatum possimus odit illo vel eaque quaerat ad pariatur velit voluptatibus similique, nisi deleniti sint culpa esse quo blanditiis magnam libero. Quis qui vel molestias animi, nesciunt dolore explicabo accusamus magni ipsa, quisquam beatae quam laboriosam quidem iusto. A cumque modi mollitia hic veritatis? Ex ipsam iste dolorum, repudiandae earum ullam quaerat voluptatibus similique aperiam, laborum esse quo? Cum atque dignissimos asperiores ullam illo voluptates quae, nesciunt esse sed.</p> */}

    </div>
  )
}
