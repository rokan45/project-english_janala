// console.log("Im connected!");
const loadLesson = () => {
    const lessonUrl = "https://openapi.programming-hero.com/api/levels/all";

    fetch(lessonUrl)
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const clicBtn = document.querySelectorAll(".lesson-btn");
    clicBtn.forEach(btn => {
        btn.classList.remove("active");
    });
}

const loadWord = (id) => {
    // console.log(id);
    manageSpinner(true);
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(wordUrl);
    fetch(wordUrl)
        .then(res => res.json())
        .then(json => {
            removeActive();  //remove all active class
            const lessonBtn = document.getElementById(`lesson-btn-${id}`);
            lessonBtn.classList.add("active"); //add active class on selelcted button
            displayWord(json.data)
        })
}

const loadWordDetails = async (id) => {
    const wordUrl = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(wordUrl);
    const details = await res.json();
    // console.log(details);
    displayWordDetails(details.data);

};

const createElements = (arr) => {
    // console.log(arr);
    const htmlElememnts = arr.map((el) =>
        `<span class="btn">${el}</span>`

    )
    return (htmlElememnts.join(" "));
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
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
        <button id="lesson-btn-${lesson.level_no}" href="" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        //2.2 append 
        lessonContainer.appendChild(lessonDIv);

    });
};

const displayWord = (words) => {
    //get the element
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="w-11/12 mx-auto bg-gray-100 rounded-md text-center py-15 mt-5 col-span-full">
        <img class="mx-auto" src="./images/alert-error.png" alt="">
            <p class="text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-medium font-bangla mt-3 text-[#292524]">নেক্সট Lesson এ যান</h2>
        </div>`
        manageSpinner(false);
        return;
    }

    //for each element
    words.forEach(word => {
        //create element
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `<div class="bg-white w-full h-[150px] rounded-md p-2.5 text-center flex flex-col">
                <div class="flex flex-col items-center justify-center flex-1">
                    <h2 class="text-lg font-bold">${word.word ? word.word : "এখানে শব্দ পাওয়া যায়নি!"}</h2>
                    <h3 class="mt-2 text-sm font-bold text-[#79716B]"><span>meaning</span>/<span>pronunciation</span>
                    </h3>
                    <h3 class="mt-2 text-sm font-bold text-[#79716B]"><span>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি!"}</span>/<span>${word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি!"}</span>
                    </h3>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <i onclick="loadWordDetails(${word.id})" class="fa-solid fa-circle-info"></i>
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>`

        //append the create element
        wordContainer.appendChild(wordCard);


    });
    manageSpinner(false);


}

const displayWordDetails = (word) => {
    //get the element
    const detailsCard = document.getElementById("word-details-card");
    detailsCard.innerHTML = `
           <h2 class="text-3xl font-semibold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})<span
        class="text-sm font-light">${word.partsOfSpeech ? word.partsOfSpeech : ""}</span></h2>
<h2 class="mt-3">Meaning</h2>
<p class="text-[#79716B] text-2xl">${word.meaning}</p>
<h2 class="text-lg font-bold mt-3">Example</h2>
<p class="mt-1">${word.sentence}</p>
<h3 class="mt-3 text-lg font-bold">সমার্থক শব্দ গুলো</h3>
<div>${createElements(word.synonyms)}
</div>

<div class="modal-action">
    <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Continue Learning</button>
    </form>
</div>`;
    document.getElementById("my_modal_5").showModal();

};


//call lesson function
loadLesson();
