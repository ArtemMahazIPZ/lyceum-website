const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            'Екзамени', 'Спорт', 'Досягнення', 'Кримінал',
            'Діджиталізація', 'Карантин', 'Трагедії', 'Зарахування'
        ]
    },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
        {
            body: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });



module.exports = model('Post', postSchema);
