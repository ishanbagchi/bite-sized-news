import { ValidationStatusEnum } from '../enums/ValidationStatus.enum'

export type ValidationModel =
	| {
			status: ValidationStatusEnum.ERROR
			message: string
	  }
	| {
			status: ValidationStatusEnum.SUCCESS
	  }
