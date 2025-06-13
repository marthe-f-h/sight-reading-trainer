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

        const scale = 2
		const width = 120
		const height = 100

		const renderer = new Renderer(ref.current, Renderer.Backends.SVG)
		renderer.resize(width * scale, height * scale)
		const ctx = renderer.getContext()
		ctx.scale(scale, scale)

		const stave = new Stave(10, -10, 100)
		stave.addClef(clef)
		stave.setContext(ctx).draw()
		const staveNote = new StaveNote({
			keys: [note],
			duration: 'w',
			clef
		})
		const voice = new Voice({ numBeats: 4, beatValue: 4 }).addTickables([
			staveNote
		])
		new Formatter().joinVoices([voice]).format([voice], 120)
		voice.draw(ctx, stave)
	}, [clef, note])

	return <div ref={ref} className="m-auto" />
}
