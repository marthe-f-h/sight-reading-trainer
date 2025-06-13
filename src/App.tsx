import { useState } from 'react'
import { NoteTrainer, type ClefType } from './NoteTrainer'

const notesTreble = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5']
const notesBass = ['e/2', 'f/2', 'g/2', 'a/2', 'b/2', 'c/3', 'd/3', 'e/3']

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
					onClick={() => setClef('treble')}
				>
					G-nøkkel
				</button>
				<button
					className={`py-1 px-4 rounded ${
						clef === 'bass'
							? 'bg-[#5d909a] text-white'
							: 'bg-gray-200'
					}`}
					onClick={() => setClef('bass')}
				>
					F-nøkkel
				</button>
			</div>

			<div className="w-48 h-32 bg-white drop-shadow rounded flex items-center justify-center">
				<NoteTrainer clef={clef} note={note} />
			</div>

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

