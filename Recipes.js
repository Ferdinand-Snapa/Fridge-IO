import React, { Component, useState } from 'react'; //importing react for react components
import axios from 'axios';
import './Recipes.css'
import TopBar from './TopBar.js'
import ButtonMenu from './ButtonMenu'
import Fridge from "../icons/fridge-icon.svg"
import Book from "../icons/book-icon.svg"

class Recipe {
  constructor(jsonData) {
    let data = JSON.parse(jsonData)
    this.Items = data.Products
    this.name = data.Recipe.recipename
    this.steps = data.Recipe.description.split('#newStep')
    steps.forEach((str, idnex) => {

    })

  }
  returnJson = () => {
    this.steps.
  }
}
const StepTransform = (step, quantity) => {
  const returnString = [];
  const items = [];
  const amount = [];
  const unit = [];
  let splitString = step.split("#id");
  splitString.forEach((str, index) =>{
    if(index%2 === 0){
      //Just text
      returnString.push(str);
    } else{
      //item ID
      const tempItem = str.split(" ");
      returnString.push(tempItem[0] + " ");
      returnString.push((parseFloat(tempItem[1]) * quantity).toString());
      returnString.push(tempItem[2])
      items.push(tempItem[0]);
      amount.push((parseFloat(tempItem[1]) * quantity).toString());
      unit.push(tempItem[2]);
    }
  });
  const returnStr = returnString.join(" ")
  return [returnStr, items, amount, unit];
}

const IngredientsToHTML = (Item, Amount, Unit)=>{
  const returnIngredients = [];
  Item.forEach((item, index) =>{
    returnIngredients.push(
        <h5>{item + ": " + Amount[index] + Unit[index]}</h5>
    )
  });
  return returnIngredients;
}
const ExpandableRecipeContainer = ({recipe, content})=>{
  //expanded is a bool for if the recipe is expanded
  const [expnaded, setExpanded] = useState(false);
  const steps = [];
  const stepsStrings = content.split('#newStep');
  const quantity = 3;

  stepsStrings.forEach((step, index) =>{
    const [StepText, Items, Amount, Unit] = StepTransform(step, quantity);
    steps.push(
        <div className="recipe-spacer"/>
    )
    steps.push(
        <div className="recipe-step-container-desc"><h3>{index + 1}:</h3>{StepText}</div>
    );

    steps.push(
        <div className="recipe-step-container-ingredients">
          {IngredientsToHTML(Items, Amount, Unit)}
        </div>
    );

  });

  const toggleExpand = () => {setExpanded(!expnaded);};

  return(
      <div className={`recipe-container ${expnaded ? 'recipe-expanded' : ''}`}>
        <div className="recipe-header" onClick={toggleExpand}>
          <div className="recipe-header-title"> {recipe}</div>
          <img src={Fridge} className="recipe-header-icon" alt={"Fridge"}/>
        </div>
        {/*content only shown rendered if expanded*/}
        {expnaded ? (
            <div className="recipe-content-container">
              <text>Ingredients: </text>
              {steps}
            </div>
        ) : ('')}
      </div>
  );
};


const NewRrcipeContainer = ({recipe}) =>{
  const [expnaded, setExpanded] = useState(false)
  const toggleExpand = () => setExpanded(!expnaded)
  //const steps = content;
}


// login component
class Recipes extends Component {
  let recipes[]
  constructor(props){
    super(props)

    this.state ={
      user: {
        username:"",
        email: ""
      },
      products: [],
      userlists: [],
      product: {
        productname:"",
        measure:"",
        type:""
      }
    }
  }

  componentDidMount(){
    console.log("Data in recipes: ", this.props.data)
    const sessionToken = sessionStorage.getItem("sessionToken")
    if(sessionToken){
      this.props.getData()
    }else{
      window.location.href = 'http://10.212.170.10:3000';
    }
  };


  render () {
    const content = "Beansasdasd asdasd asd sadsfasdfa sdfasdf asdfasdf asdf sdf asdf sadf asdfasdfsdfeferwfrgdsfgdsafg#idBeanIngredient 5 kg#id, #idRum 2 bottles#id, #idOrange 90 ton#id " +
        "#newStep BakeEm (sdgfh shadbfasudfhapwedpiefghsaduofv asrdhfugah sruigahergiuzsfbcvxcn,vbasejruigbasydiu gb<sdfbs<dhjkl f bswy<iuefg)" +
        "#newStep Mash em#idTest 90 kg#id#idTest 90 kg#id#idTest 90 kg#id#idTest 90 kg#id#idTest 90 kg#id#idTest 90 kg#id" +
        "#newStep Stick Em in a stew #idTest 3 amount#id";
    return (
      <main id = "page_recipes">
        <TopBar username = {this.props.data.user.username} text = "Recipes"/>
        <div className="recipe-area">
          <ExpandableRecipeContainer recipe={"Food recipe"} content={content}/>
          <ExpandableRecipeContainer recipe={"Beans"} content={content}/>
          <ExpandableRecipeContainer recipe={"Corn"} content={content}/>
          <ExpandableRecipeContainer recipe={"Tennis Balls"} content={content}/>
        </div>
        <ButtonMenu/>
      </main>
    );
  }
}

export default Recipes;