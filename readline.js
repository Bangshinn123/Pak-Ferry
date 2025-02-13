const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const r1 = readline.createInterface({ input, output });

r1.question('Siapa nama Anda? ', (nama) => {
    r1.question('Apa yang Anda pikirkan tentang Node.js? ', (jawaban) => {
        const respon = { nama, jawaban };

        // Menentukan nama file JSON
        const filePath = 'responnodejs.json';

        let responder = [];

        // Mengecek apakah file ada, jika tidak, buat array kosong
        if (fs.existsSync(filePath)) {
            try {
                const file = fs.readFileSync(filePath, 'utf-8');
                responder = JSON.parse(file); // Parsing isi file
                if (!Array.isArray(responder)) throw new Error('Format JSON tidak valid');
            } catch (error) {
                console.error('Error membaca atau memproses JSON:', error.message);
                responder = []; // Reset ke array kosong jika format salah
            }
        }

        // Menambahkan respon baru ke array
        responder.push(respon);

        // Menyimpan kembali data ke file dengan format JSON yang rapi
        fs.writeFileSync(filePath, JSON.stringify(responder, null, 2));

        console.log(`Terima kasih ${nama} atas respon Anda!`);

        r1.close();
    });
});
