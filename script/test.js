const createElements = (arr) => {
    // console.log(arr);
    const htmlElememnts = arr.map((el) =>
        `<span class="btn">${el}</span>`

    )
    console.log(htmlElememnts.join(" "));
}

const syn = ["book", "paper", "Nice"];
createElements(syn);