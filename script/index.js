// console.log("Im connected!");
const loadLesson = () => {
    const lessonUrl = "https://openapi.programming-hero.com/api/levels/all";

    fetch(lessonUrl)
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

//display lessoon data
const displayLesson = (lessons) => {
    //1. get the element
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    // 2.for each element
    lessons.forEach(lesson => {
        //2.1create element
        const lessonDIv = document.createElement("div");
        lessonDIv.innerHTML = `
        <button href="" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        //2.2 append 
        lessonContainer.appendChild(lessonDIv);

    });
};

const loadWord = (id) => {
    // console.log(id);
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(wordUrl);
    fetch(wordUrl)
        .then(res => res.json())
        .then(json => displayWord(json.data))
}

const displayWord = (words) => {
    //get the element
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    //for each element
    words.forEach(word => {
        //create element
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `<div class="bg-white w-[300px] h-[150px] rounded-md p-2.5 text-center flex flex-col">
                <div class="flex flex-col items-center justify-center flex-1">
                    <h2 class="text-lg font-bold">${word.word}</h2>
                    <h3 class="mt-1 text-sm font-bold text-[#79716B]"><span>meaning</span>/<span>pronunciation</span>
                    </h3>
                    <h3 class="mt-1 text-sm font-bold text-[#79716B]"><span>${word.meaning}</span>/<span>${word.pronunciation}</span>
                    </h3>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <i class="fa-solid fa-circle-info"></i>
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>`

        //append the create element
        wordContainer.appendChild(wordCard);


    });


}


//call lesson function
loadLesson();

//calling wordData function
displayWord();
