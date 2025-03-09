import { AnimatePresence, motion, Target, Transition } from 'framer-motion'

interface Props {
	keyValue?: string
	initial?: Target
	animate?: Target
	transition?: Transition
	className?: string
	children: React.ReactNode
}

const AnimationWrapper: React.FC<Props> = ({
	keyValue,
	initial = {
		opacity: 0,
	},
	animate = {
		opacity: 1,
	},
	transition = {
		duration: 0.5,
	},
	className,
	children,
}) => {
	return (
		<AnimatePresence>
			<motion.div
				key={keyValue}
				initial={initial}
				animate={animate}
				transition={transition}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default AnimationWrapper
