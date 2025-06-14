import { useState } from 'react'
import { NoteTrainer, type ClefType } from './NoteTrainer'

const notesTreble = [
	'b/3',
	'c/4',
	'd/4',
	'e/4',
	'f/4',
	'g/4',
	'a/4',
	'b/4',
	'c/5',
	'd/5',
	'e/5',
	'f/5',
	'g/5',
	'a/5',
	'b/5'
]
const notesBass = [
	'c/2',
	'd/2',
	'e/2',
	'f/2',
	'g/2',
	'a/2',
	'b/2',
	'c/3',
	'd/3',
	'e/3',
	'f/3',
	'g/3',
	'a/3',
	'b/3',
	'c/4',
	'd/4'
]

function getRandomNote(clef: ClefType) {
	const pool = clef === 'treble' ? notesTreble : notesBass
	return pool[Math.floor(Math.random() * pool.length)]
}

export const App = () => {
	const [clef, setClef] = useState<ClefType>('treble')
	const [note, setNote] = useState(getRandomNote(clef))
	const [feedback, setFeedback] = useState<'Riktig!' | 'Feil!' | null>(null)

	const handleAnswer = (ans: string) => {
		if (ans === note.charAt(0)) {
			setFeedback('Riktig!')
		} else {
			setFeedback('Feil!')
		}
		setTimeout(() => {
			setNote(getRandomNote(clef))
			setFeedback(null)
		}, 800)
	}

	return (
		<div className="pt-6 sm:pt-12 min-h-screen bg-gray-50 flex flex-col items-center gap-6 ">
			<h1 className="text-2xl font-semibold">
				Øv på noter: {clef === 'treble' ? 'G-nøkkel' : 'F-nøkkel'}
			</h1>

			<div className="space-x-4">
				<button
					className={`py-1 px-4 rounded ${
						clef === 'treble'
							? 'bg-[#5d909a] text-white'
							: 'bg-gray-200'
					}`}
					onClick={() => {
						setClef('treble')
						setNote(getRandomNote('treble'))
					}}
				>
					G-nøkkel
				</button>
				<button
					className={`py-1 px-4 rounded ${
						clef === 'bass'
							? 'bg-[#5d909a] text-white'
							: 'bg-gray-200'
					}`}
					onClick={() => {
						setClef('bass')
						setNote(getRandomNote('bass'))
					}}
				>
					F-nøkkel
				</button>
			</div>

			<div className="bg-white drop-shadow rounded flex items-center justify-center">
				<NoteTrainer clef={clef} note={note} />
			</div>

			{
				// eslint-disable-next-line no-constant-binary-expression
				false && (
					<div className="grid grid-cols-7 gap-3">
						{[...'abcdefg'].map((n) => (
							<button
								key={n}
								onClick={() => handleAnswer(n)}
								className="px-3 py-2 bg-[#82c0cc] text-white rounded hover:bg-[#5d909a]"
							>
								{n.toUpperCase()}
							</button>
						))}
					</div>
				)
			}

			<div className="flex flex-wrap gap-4 pl-6 pr-6 justify-center">
				{[...'abcdefg'].map((n) => (
					<button
						key={n}
						onClick={() => handleAnswer(n)}
						className="w-[4rem] h-[4rem] bg-[#82c0cc] text-white rounded hover:bg-[#5d909a] text-3xl"
					>
						{n.toUpperCase()}
					</button>
				))}
			</div>

			<div role="alert">
				{feedback === 'Riktig!' && (
					<div className="text-xl font-bold text-green-600">
						{feedback}
					</div>
				)}

				{feedback === 'Feil!' && (
					<div className="text-xl font-bold text-red-600">
						{feedback}
					</div>
				)}
			</div>
		</div>
	)
}

