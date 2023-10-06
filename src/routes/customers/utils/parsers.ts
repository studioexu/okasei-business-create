import type { CompanyInfo, CompanyEntries } from './types'
import { Company } from './classes'

export const parseCompanyInfo = (
	companyEntry: CompanyInfo | CompanyEntries,
	actionType?: string
): CompanyInfo => {
	let options: Intl.DateTimeFormatOptions = {
		timeZone: 'Asia/Tokyo',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	}

	const formatter = new Intl.DateTimeFormat([], options)
	const timeArray = formatter.format(new Date()).split(', ')

	let companyUpdateDelete = companyEntry as CompanyInfo
	let newCompanyToParse = companyEntry as CompanyEntries

	function isCompanyInfo(companyEntry: CompanyInfo | CompanyEntries): companyEntry is CompanyInfo {
		return (
			(companyEntry as CompanyInfo).delete !== undefined ||
			(companyEntry as CompanyInfo).update !== undefined
		)
	}

	let newCompany: CompanyInfo | any = {}

	switch (actionType) {
		case 'delete':
			// let newCompany: CompanyInfo
			const deleted = {
				status: '削除',
				deletedDate: timeArray[0],
				deletedTime: timeArray[1]
			}

			if (isCompanyInfo(companyEntry)) {
				companyEntry.delete.status = deleted.status
				companyEntry.delete.deletedDate = deleted.deletedDate
				companyEntry.delete.deletedTime = deleted.deletedTime

				newCompany = companyEntry
			}
		case 'update':
			const updated = {
				status: '更新',
				lastUpdatedDate: timeArray[0],
				lastUpdatedTime: timeArray[1]
			}

			if (isCompanyInfo(companyEntry)) {
				companyEntry.update.status = updated.status
				companyEntry.update.lastUpdatedDate = updated.lastUpdatedDate
				companyEntry.update.lastUpdatedTime = updated.lastUpdatedTime
				return (newCompany = companyEntry)
			}
			break
		default:
			const registration = {
				status: '登録',
				date: timeArray[0],
				time: timeArray[1]
			}

			if (!isCompanyInfo(companyEntry)) {
				newCompany = new Company(companyEntry, registration)
			}
			break
	}

	return newCompany
}
