import { useEffect, useRef } from 'react'
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow'

export type ClefType = 'treble' | 'bass'
interface NoteTrainerProps {
	clef: ClefType
	note: string
}

export const NoteTrainer = ({ clef, note }: NoteTrainerProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) return
		ref.current.innerHTML = ''
		const renderer = new Renderer(ref.current, Renderer.Backends.SVG)
		renderer.resize(150, 120)
		const ctx = renderer.getContext()
		const stave = new Stave(10, 10, 130)
		stave.addClef(clef)
		stave.setContext(ctx).draw()
		const staveNote = new StaveNote({ keys: [note], duration: 'q', clef })
		const voice = new Voice({ numBeats: 1, beatValue: 4 }).addTickables([
			staveNote
		])
		new Formatter().joinVoices([voice]).format([voice], 120)
		voice.draw(ctx, stave)
	}, [clef, note])

	return <div ref={ref} className="m-auto" />
}
