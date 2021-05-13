"use stricts";

document.addEventListener("DOMContentLoaded", ()=>{

    let noteapp = new Noteapp
    let originalList = document.querySelectorAll('li')
    let noteList = document.querySelectorAll('li')
    let expandButton = document.querySelector(".expand-button")
    let newNoteButton = document.querySelector(".submit-note")

    newNoteButton.addEventListener("click", async()=> {
        let note = await createEmoji(document.querySelector(".note-import").value)
        noteapp.createNote(note)
        
        currentNote = document.createElement("li")
        currentNote.textContent = noteapp.show20Chars(noteapp.list.length)
        document.querySelector("ol").append(currentNote)
        document.querySelector(".note-import").value = ""
    })       



    expandButton.addEventListener("click", ()=> {
        let noteNumber = document.querySelector(".item-number").value
        let expandedNote = noteapp.showEntireNote(noteNumber)

        document.querySelectorAll("li")[noteNumber - 1].innerText = expandedNote
    })

    createEmoji = (text) => {
        let jsonText = JSON.parse(`{ "text": "${text}" }`)
         return fetch('https://makers-emojify.herokuapp.com/', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(jsonText)
             })
         .then(response => response.json())
         .then(data => data.emojified_text)
     }


})
