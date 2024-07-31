console.log("Hi!")

var arr=JSON.parse(table);
// arr.forEach((item)=>{
//     console.log(item);
// });


function randDescribing(){
    arr.forEach((item)=>{
        item.table.forEach((i)=>{
            i.students=Math.round(Math.random()*i.max);
        })
    })
}

randDescribing();

arr.forEach((item)=>{
    console.log(item);
});

var myTable=new Array();
var index=0;
var temp=null;
let field=document.querySelector(".field");

function makeItem(arr){
    field.innerHTML="";
    arr.forEach((item,index)=>{
        console.log(item);
    
        var temp0=item.table[0].max-item.table[0].students;
        var places_str="мест";
        if(temp0==1){
            places_str=+temp0+" место";
        }
        if(temp0>1&&temp0<=4){
            places_str=+temp0+" места";
        }
        if(temp0==0||temp0>4){
            places_str=+temp0+" мест";
        }

        field.insertAdjacentHTML("beforeend",`
            <div class="item">
                <p class="item_name">${item.name}</p>
                <p class="item_day">${item.day}</p>
                <p class="item_time">${item.table[0].time}</p>
                <div class="btn_block">
                    <button id="in_1_${index}" class="i_button">Записаться</button>
                    <button id="out_1_${index}" class="i_button disactive">Отписаться</button>
                </div>
                <div class="available_places">
                    <p>Осталось</p> 
                    <p id="places_${index}">${places_str}</p>
                </div>
            </div>
        `);

        let in_1=field.querySelector("#in_1_"+index);
        let out_1=field.querySelector("#out_1_"+index);
        //let places_2=field.querySelector("#places_"+index);
        
        if(temp0==0){
            in_1.classList.add("disactive");
        }
    
        in_1.addEventListener("click",()=>{
            console.log("in1");
            myTable.push({
                'name':item.name,
                'day':item.day,
                'time':item.table[0].time
            })

            in_1.classList.add("disactive");
            in_1.innerHTML="Вы записаны!"
            out_1.classList.remove("disactive");
            in_1.blur();

            console.log(myTable); 
        });

        out_1.addEventListener("click",()=>{
            if(!out_1.classList.contains("disactive")){
                out_1.classList.add("disactive");
                in_1.innerHTML="Записаться"
                in_1.classList.remove("disactive");

                myTable=myTable.filter((t)=>{
                    if(t.name==item.name&&t.day==item.day&&t.time==item.table[0].time)
                    {
                        return false;
                    }else{
                        return true;
                    }
                })
                out_1.blur();
            }

            console.log(myTable); 
        });
        




        temp0=item.table[1].max-item.table[1].students;
        places_str="мест";
        if(temp0==1){
            places_str=+temp0+" место";
        }
        if(temp0>1&&temp0<=4){
            places_str=+temp0+" места";
        }
        if(temp0==0||temp0>4){
            places_str=+temp0+" мест";
        }

        field.insertAdjacentHTML("beforeend",`
            <div class="item">
                <p class="item_name">${item.name}</p>
                <p class="item_day">${item.day}</p>
                <p class="item_time">${item.table[1].time}</p>
                <div class="btn_block">
                    <button id="in_2_${index}" class="i_button">Записаться</button>
                    <button id="out_2_${index}" class="i_button disactive">Отписаться</button>
                </div>
                <div class="available_places">
                    <p>Осталось</p> 
                    <p id="places_${index}">${places_str}</p>
                </div>
            </div>
        `);

        let in_2=field.querySelector("#in_2_"+index);
        let out_2=field.querySelector("#out_2_"+index);
        //let places_2=field.querySelector("#places_"+index);
        
        if(temp0==0){
            in_2.classList.add("disactive");
        }
    
        in_2.addEventListener("click",()=>{
            myTable.push({
                'name':item.name,
                'day':item.day,
                'time':item.table[1].time
            })

            in_2.classList.add("disactive");
            in_2.innerHTML="Вы записаны!"
            out_2.classList.remove("disactive");
            in_2.blur();
            console.log(myTable); 
        });

        out_2.addEventListener("click",()=>{
            if(!out_2.classList.contains("disactive")){
                out_2.classList.add("disactive");
                in_2.innerHTML="Записаться"
                in_2.classList.remove("disactive");

                myTable=myTable.filter((t)=>{
                    if(t.name==item.name&&t.day==item.day&&t.time==item.table[1].time)
                    {
                        return false;
                    }else{
                        return true;
                    }
                })
                out_2.blur();
            }

            console.log(myTable); 
        });

    });
}

makeItem(arr);

let callboard=document.querySelector("#callboard_id");

document.querySelector("#confirm").addEventListener("click",(e)=>{
    
    callboard.classList.add("callboard");
    callboard.classList.remove("unvisible");
    var str="";
    myTable.forEach((item)=>{
        str+=item.name+" on "+item.day+" at "+item.time+"<br/>";
    })
    callboard.querySelector(".msg_text").innerHTML=str;
});



document.addEventListener("keydown",(e)=>{
    if(e.key=='Enter'){
        callboard.classList.add("callboard");
        callboard.classList.remove("unvisible");
        var str="";
        myTable.forEach((item)=>{
            str+=item.name+" on "+item.day+" at "+item.time+"<br/>";
        })
        callboard.querySelector(".msg_text").innerHTML=str;
    }
});

document.querySelector("#msg_btn_ok").addEventListener("click",(e)=>{
    myTable.forEach((item)=>{
        arr.forEach((obj)=>{
            if(item.name==obj.name&&item.day==obj.day){
                console.log("Same name and day "+obj.name+" "+obj.day);
                obj.table.forEach((t)=>{
                    console.log(t.time)
                    if(item.time==t.time){
                        console.log("Same time "+t.time+" "+t.students);
                        t.students++;
                    }
                })
            }
        })
        console.log(arr);
    })
    myTable.splice(0);
    callboard.classList.add("unvisible");
    callboard.classList.remove("callboard");
    makeItem(arr);
});

document.querySelector("#msg_btn_cancel").addEventListener("click",(e)=>{
    callboard.classList.add("unvisible");
    callboard.classList.remove("callboard");
});

