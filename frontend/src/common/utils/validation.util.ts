import { ValidationStatusEnum } from '../enums/ValidationStatus.enum'
import { ValidationModel } from '../models/ValidationModel.type'

export const getValidationError = (error: string): ValidationModel => {
	return {
		status: ValidationStatusEnum.ERROR,
		message: error,
	}
}
