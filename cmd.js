const yargs = require('yargs');
const fs = require('fs');
const { stringify } = require('querystring');
const { array } = require('yargs');
 
 yargs.command({
     command: 'list',
     describe: 'Liste toutes mes notes',
     handler: () => {
        console.log("Voici la liste des notes")
        fs.readFile("data.json", "utf-8",(err,data) => {
            if(err) console.log(err);
            else {
                const dataJS = JSON.parse(data);

                dataJS.forEach(data => {
                    console.log(`${data.id} ${data.title} ${data.message}`)
                })
            }
        })
     }
 }).command({
     command: 'add',
     describe: "Ajoute une note",
     builder: {
        title: {
            describe: "Titre de ma note",
            demandOption: true,
            type: "string"
        },
        message: {
            describe: "Message de ma note",
            demandOption: false,
            type: "string"
        }
     },
     handler: (argv) => {

         fs.readFile("data.json", "utf-8", (err, dataStr) => {
             if(err) console.log(err);
             // 1.a Grâce à l'utf-8 , le contenu du fichier est en chaîne de caractère
             console.log(dataStr);

             // 1.b Je transforme la string JSON en valeur JS
             const notes = JSON.parse(dataStr);
             console.log(notes);

             // 2 exécuter les modifications en JS
             // 2.a Je vais récupérer le dernier élément du tableau 
             const lastNoteId = notes[notes.length-1].id;
             console.log(lastNoteId);

             const newNote = {
                 id: lastNoteId +1,
                 title: argv.title,
                 message: argv.title
             }
             notes.push(newNote);
             console.log(notes);

             const notesJSON = JSON.stringify(notes);
             console.log(notesJSON);

             fs.writeFile("data.json", notesJSON, (err) => {
                 if(err) console.log(err)
                 else {
                     console.log("La note a été ajoutée.")
                 }
             })
         })

     }
 }).command({
     command: 'remove',
     describe: "Supprime une note",
     builder: {
         id: {
             describe: "Id de la note que l'on souhaite supprimer",
             demandOption: true,
             type: BigInt
         }
     },
     handler: (argv) => {
        console.log("Chaud pour supprimer une note");
        console.log(argv.id);

        fs.readFile("data.json", "utf-8", (err, data) => {
            if(err) console.log(err);
            else {
                // console.log(data);
                let arrayJS = JSON.parse(data);
                // console.log(arrayJS);

                let newArrayJS = arrayJS.filter(array => array.id !== argv.id);
                // console.log(newArrayJS);

                let newArrayJSON = JSON.stringify(newArrayJS);
                // console.log(newArrayJSON);

                fs.writeFile("data.json", newArrayJSON, (err) => {
                    if(err) console.log(err);
                    else console.log(`Note numéro ${argv.id} supprimé!`);
                })
            }
        })

         
     }
 }).command({
     command: 'read',
     describe: "Affiche le détail d'une note",
     builder: {
        id: {
            describe: "Id de la note que l'on souhaite lire",
            demandOption: true,
            type: BigInt
        }
    },
     handler: (argv) => {
         console.log("Voici le détail d'une note");
         console.log(`Vous avez demandé à lire la note numéro ${argv.id}`);
         
         fs.readFile("data.json", 'utf-8', (err,data) => {
             if(err) console.log(err)
             else {
                //  console.log(data);
                let readArrayJS = JSON.parse(data);
                // console.log(readArrayJS);
                let readId = readArrayJS.filter(arg => arg.id === argv.id);
                // console.log(readId);
                let readIdJSON = JSON.stringify(readId);
                console.log(readIdJSON);
             }
         })

     }
 }).argv;

 