const fs = require('fs');
const express = require('express')
const cors = require('cors')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Setup documentation at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Avoid CORS errors in browsers
app.use(cors())

// Populate req.body
app.use(express.json())

// Hardcoded list of poems
let poems = [{
    id: 1,
    title: 'Wulf and Eadwacer (trans. by Roy Liuzza)\n',
    content: 'It\'s as if someone should give a gift to my people—\n' + 'they will kill him if he comes to the troop.\n' + 'It is otherwise for us.\n' + 'Wulf is on an island, I on another.\n' + 'Fast is that island, surrounded by fen.\n' + 'The men on the island are murderous and cruel;\n' + 'they will kill him if he comes to the troop.\n' + 'It is otherwise for us.\n' + 'I felt far-wandering hopes for my Wulf,\n' + 'as I sat weeping in the rainy weather,\n' + 'when the bold warrior\'s arms embraced me—\n' + 'it was sweet to me, yet I also despised it.\n' + 'Wulf, my Wulf! My wanting you\n' + 'has made me sick—your seldom coming,\n' + 'my mourning heart, not lack of meat.\n' + 'Do you hear, Eadwacer? A wolf bears away\n' + 'our wretched cub to the woods.\n' + 'One can easily split what was never united,\n' + 'the song of the two of us.',
    likeCount: 9999,
    entryDate: '2022-12-03',
    addedBy: 'Admin',
}, {
    id: 2,
    title: 'Crush 1999',
    content: 'The good lilac just beyond the house\n' + 'hangs in bloom like a lace dress.\n' + 'With no one home, I gather\n' + 'my young body from the closet,\n' + 'smell every floral and vased death,\n' + 'fit loose my sister’s robin’s egg\n' + 'skirt around my waist. Quiet,\n' + 'in her unlit room, I go tenderly\n' + 'to the mirror, my bare collarbone\n' + 'a trickled pond of redbirds\n' + 'that will ribbon unsoftly with time—\n' + 'but here, now, I am seven, and love\n' + 'so deeply a boy in second grade,\n' + 'I need to be pretty in the dark.',
    likeCount: 420,
    entryDate: '2021-05-13',
    addedBy: 'PETER MASON',
}, {
    id: 3,
    title: 'Moon Ghazal',
    content: 'I can’t remember the first time I saw it, seems it was\n' + 'always there, even with me in the womb, the moon.\n' + '\n' + 'It must have been night, above the ocean, making a path\n' + 'on the waves, gilded invitation, the parchment moon.\n' + '\n' + 'Or the day moon, see-through-y wafer over desert, caught\n' + 'in the arms of saguaro, thin-skinned, heart-stuck moon.\n' + '\n' + 'Blue as new milk, aquarium water, Mexican tile, blue\n' + 'as cold-bitten fingertips, nailbeds’ quick-blue arcs, half-moons.\n' + '\n' + 'How I felt when I saw my first grown boy, round-eyed,\n' + 'all sinew and muscle, his calves, his biceps, plump as moons.\n' + '\n' + 'Buttons, doorknobs, volleyballs, clocks, egg yolk, orange\n' + 'slice, violet iris, our planet a pupil, mote in the eye of the moon.\n' + '\n' + 'The cell inside me splitting and splitting, worm of the fetus,\n' + 'tadpole, the glazed orb of the eye, my belly taut as the moon.\n' + '\n' + 'The blood-streaked moon of her head pushing through, moons\n' + 'of the faces above me, urging me, pulling, promising the moon.\n' + '\n' + 'There are earthquakes on the moon, water, not geologically dead,\n' + 'still acting like a planet: upheaval, turmoil, shaking her head, the moon.\n' + '\n' + 'When I see the earth of you I still feel moonquakes, even now, after\n' + 'so many moons my round breasts swoon, your fingertips, small moons.',
    likeCount: 200,
    entryDate: '2020-03-03',
    addedBy: 'DORIANNE LAUX',
}, {
    id: 4,
    title: 'Terms and Conditions',
    content: 'You call me ho; it’s short for home.\n' + 'A cockroach falls from a chandelier\n' + 'and my bodega loyalty fluctuates in\n' + 'pace with the funeral’s bloody nose.\n' + 'I’ve been eating trees my whole life,\n' + 'which usually made me more patient\n' + 'but more cruel; recently I stood on\n' + 'a porch that wraps around that nest,\n' + 'the house that used me. Any noise\n' + 'can be a curse to a child of chaos,\n' + 'silent hallways from Gothic novels\n' + 'to twilight wind in fire songs. This\n' + 'unlucky, to not even be an architect\n' + 'and to be inundated with the prose\n' + 'of it all—were we, daughters, spent,\n' + 'when all hoped for sums? You call\n' + 'out ha; it’s short for harvest. To be\n' + 'a child is to gather secrets, an elder\n' + 'to risk in transit. Once when I was\n' + 'recovering, covering again myself,\n' + 'I confused sharing for stealing, read\n' + 'murder into shadows until laughter\n' + 'came from silhouettes. We’ve since\n' + 'phased, piano bleaching the scene,\n' + 'becoming the fog and the pulp. You\n' + 'name me ma; I know it means mine.',
    likeCount: 50,
    entryDate: '2019-12-20',
    addedBy: 'CINDY JUYOUNG OK',
},]

app.get('/poems', (req, res) => {
    res.send(poems)
})

// Serve the frontend
app.get('/', (req, res) => {

    // Read the index.html file and send it to the client
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.setHeader('content-type', 'text/html');
        res.send(html)
    });
})

// Configure dotenv to read .env vars into Node
require('dotenv').config()

// Save the port number from the .env file
let port = process.env.port;

// Start the server
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})