interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	leftIcon?: string
	rightIcon?: string
	onRightIconClick?: () => void
}

const InputBox: React.FC<Props> = ({
	leftIcon,
	rightIcon,
	onRightIconClick,
	...props
}) => {
	return (
		<div className="relative w-[100%] mb-4">
			<input className="input-box" {...props} />
			{leftIcon ? (
				<i className={'fi ' + leftIcon + ' input-icon'} />
			) : null}
			{rightIcon ? (
				<i
					className={
						'fi ' +
						rightIcon +
						' input-icon left-[auto] right-4 cursor-pointer'
					}
					onClick={onRightIconClick}
				/>
			) : null}
		</div>
	)
}

export default InputBox
