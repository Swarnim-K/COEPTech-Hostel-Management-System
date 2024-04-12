import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './AllotmentYearCard.css';


var buttontitle = 'Start Round 1';
//let buttontitle2 = '';
//let roundNo = [1, 1, 1, 1];
//const buttonList = [];
//let roundOneComp = false;
const AllotmentYearCard = ((props)=>{
    
    console.log(props);
    const [button1, setButton1] = useState(buttontitle);
    const [button2, setButton2] = useState(buttontitle);
    const [button3, setButton3] = useState(buttontitle);
    const [button4, setButton4] = useState(buttontitle);

    const navigate = useNavigate();
    const buttonList = [];

    

    const[roundNo, setRoundNo] = useState([1,1,1,1]);
    
    const[roundOneComp, setRoundOneComp] = useState(false);
    //const[startButton, setStartButton] = useState(buttontitle2);
    const[startRoundButton, setStartRoundButton] = useState([]);
    //const[buttonList, setButtonList] = useState([]);

    // const addButton = () => {
    //     setButtonNo(buttonNo + 1);
    // }

    
    
    //const[roundOneComp, setRoundOneComp] = useState(false);

    // function addToButtonList(startRound){
    //     setButtonList((prevButtonList) => [
    //         ...prevButtonList,
    //         <button 
    //         className='start-now' 
    //         onClick={() => handleClick(props.class)}> 
    //             {startRound} 
    //         </button>,
    //     ]  
    //     );
    // }

    function addToStartButtonList(newButton){
        setStartRoundButton((prevButtonList) => [
            ...prevButtonList, newButton,
        ]);
    };

    function handleClickHelper(index){
        console.log(roundNo);
        console.log(buttontitle);
        if(buttontitle.substring(0,5) == 'Start'){
            buttontitle = 'End Round ' + roundNo[index];
            setRoundNo((prevRoundNo) => {
                const newRoundNo = [...prevRoundNo];
                newRoundNo[index] = prevRoundNo[index] + 1;
                return newRoundNo;
            });
        }
        else if(buttontitle.substring(0,3) == 'End'){
             //roundOneComp = true;
            setRoundOneComp(true);
            console.log(roundOneComp)
            buttontitle = "Show Result Round " + (roundNo[index]-1);
            addToStartButtonList(buttontitle);
            console.log(startRoundButton);
            console.log(startRoundButton.length);
            //roundNo[index] = roundNo[index] + 1;
            
            buttontitle = "Start Round " + roundNo[index];
        }
        else if(buttontitle.substring(0,4) == 'Show'){
            buttontitle = 'Start Round ' + roundNo[index];
        }
    }

    function handleClick(year){
        if(year == 'F.Y.'){

            handleClickHelper(0);
            setButton1(buttontitle);
            // if(startButton != ''){
            //     setStartButton(buttontitle2);
            // }

        }else if(year == 'S.Y.'){

            handleClickHelper(1);
            setButton2(buttontitle);
            // if(startButton != ''){
            //     setStartButton(buttontitle2);
            // }

        }else if(year == 'T.Y.'){

            handleClickHelper(2);
            setButton3(buttontitle);
            // if(startButton != ''){
            //     setStartButton(buttontitle2);
            // }

        }else{

            handleClickHelper(3);
            setButton4(buttontitle);
            // if(startButton != ''){
            //     setStartButton(buttontitle2);
            // }

        }   
    }

    function handleAllotButton(year, roundArray){
        if(year == 'F.Y.'){
            navigate(`/allotment/:${roundArray[0]}/:fybtech`);
        } else if(year == 'S.Y.')
        {   navigate(`/allotment/:${roundArray[1]}/:sybtech`);
        } else if(year == 'T.Y.'){
            navigate(`/allotment/:${roundArray[2]}/:tybtech`);
        }else if(year == 'B.Tech'){
            navigate(`/allotment/:${roundArray[3]}/:finalyearbtech`);
        }
        
    }

    function handleResultButton(std, year, round){
        round = round.slice(-1);
        console.log({std, year, round});
    }

    return(
        <div id="content">
            <div className="card--container">
                <div className="card--body">
                    <div className="card--content">
                        <div className="card--title">{props.class} {props.academicYear}</div>

                        <div className="room-allocation-button-container">
                            {props.academicYear == '23-24' ? (
                                <div className='card-button-container'>

                                    {/* {button1.substring(0,4) == 'Show' || button2.substring(0,4) == 'Show' ||
                                     button3.substring(0,4) == 'Show' || button4.substring(0,4) == 'Show' ? (
                                        <button className='start-now' onClick={() => handleClick(props.class)} > 
                                            {buttontitle2}
                                        </button>
                                     ) : <></> 
                                    } */}

                                    <button className="start-now round-button" onClick={()=>handleClick(props.class)}>
                                        {props.class == 'F.Y.' ? (button1) : 
                                         props.class == 'S.Y.' ? (button2) :
                                         props.class == 'T.Y.' ? (button3) :
                                         (button4)}
                                    </button>

                                    

                                    {button1.substring(0,3)=="End" || button2.substring(0,3)=="End" ||  
                                     button3.substring(0,3)=="End" || button4.substring(0,3)=="End"? (
                                        <>
                                            <button className='start-now allot-button' 
                                            onClick={() => handleAllotButton(props.class, roundNo)}>
                                                Allot
                                            </button>
                                        
                                            

                                        </>
                                        
                                    ): <></>}

                                            { roundOneComp == true ? 
                                            startRoundButton.forEach((startRound,index) => {
                                                console.log(startRound);
                                                // addToButtonList(startRound);
                                                buttonList.push(
                                                    <button 
                                                    key={index}
                                                    className='start-now' 
                                                    onClick={() => handleResultButton(props.class, props.academicYear,startRound)}> 
                                                        {startRound} 
                                                    </button>
                                                )
                                                
                                                
                                            }) : console.log("HERE")}

                                            <>
                                                {buttonList}
                                                {/* {buttonList.forEach((e) => {
                                                    console.log({e.target.year,
                                                                 e.target.startYear,
                                                                 e.target.round});
                                                })} */}
                                            </>

                                        
                                    
                                </div>
                            ) : (
                                <button className="start-now">
                                    Show Allocation List
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default AllotmentYearCard;