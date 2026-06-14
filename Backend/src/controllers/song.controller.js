const songModel = require('../models/song.model')
const storageService = require('../services/storage.service')
const id3 = require('node-id3')

const canonicalMoodMap = {
    happy: 'Happy',
    laughing: 'Laughing',
    kissing: 'Kissing',
    concerned: 'Concerned',
    surprised: 'Surprised',
    shocked: 'Surprised',
    angry: 'Concerned',
    sad: 'Concerned',
    confused: 'Concerned',
    playful: 'Laughing',
    neutral: 'Happy'
}

const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const uploadSong = async (req, res) => {
    try {
        const songBuffer = req.file.buffer
        const { mood } = req.body
        const tags = id3.read(songBuffer)

        const [songFile, posterFile] = await Promise.all([
            storageService.uploadFile({
                buffer: songBuffer,
                fileName: tags.title,
                folder: '/cohort-2/moodify/songs'
            }),
            storageService.uploadFile({
                buffer: tags.image.imageBuffer,
                fileName: tags.title + '.jpeg',
                folder: '/cohort-2/moodify/posters'
            })
        ])

        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood
        })

        return res.status(201).json({
            message: "Song uploaded successfully",
            song
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getSong = async (req, res) => {
    try {
        const normalizedMood = String(req.query?.mood || '').trim().toLowerCase()

        if (!normalizedMood) {
            return res.status(400).json({
                message: "Mood is required"
            })
        }

        const canonicalMood = canonicalMoodMap[normalizedMood] || normalizedMood

        let song = await songModel.findOne({
            mood: {
                $regex: `^${escapeRegExp(canonicalMood)}$`,
                $options: 'i'
            }
        })

        if (!song && canonicalMood !== 'Happy') {
            song = await songModel.findOne({
                mood: {
                    $regex: '^Happy$',
                    $options: 'i'
                }
            })
        }

        if (!song) {
            return res.status(404).json({
                message: "No song found for the given mood"
            })
        }

        return res.status(200).json({
            message: "Song fetched successfully",
            song
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { uploadSong, getSong }
