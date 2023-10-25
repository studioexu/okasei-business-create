import type { CustomerEntries } from './types'
import { CustomerBackend } from './classes'

/**
 * Get the time and date
 * @returns string with the right date and time
 */
const getDateTime = (): string => {
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

	return formatter.format(new Date())
}

/**
 * We convert the useer's entries before sending/posting them to the backend.
 * バックエンドに送る前に、バックエンドのフォマット似合わせるようにエントリを変更する。
 * @param entries user's entries
 * @returns customer Object with the right format and the registration date/ 登録日時と正しいフォマットのカスタマーのオブジェクト
 */
export const parseBeforePost = (entries: CustomerEntries): CustomerBackend => {
	const timeArray = getDateTime()

	const registration = {
		registDate: timeArray,
		registBy: 1
	}

	return new CustomerBackend(entries, registration)
}

/**
 * We change the active properties and add the delete date and time before update the data in the backend.
 * バックエンドにupdateする前に、削除日時を追加し、ActiveはFalseにする。
 * @param customer:Object customer's information
 * @returns same customer Object with updated data/ アップデートされた同じカスタマーオブジェクト
 */
export const parseBeforeDelete = (customer: CustomerBackend): CustomerBackend => {
	const timeArray = getDateTime()

	const deleted = {
		Delete_Date: timeArray,
		Delete_By: 1
	}

	customer.delete = deleted
	customer.is_active = false

	return customer
}

/**
 * We convert the useer's entries before updating them in the backend.
 * バックエンドにupdateする前に、バックエンドのフォマット似合わせるようにエントリを変更する。
 * @param entries user's entries
 * @returns customer Object with the right format and the updated date/ 更新日時と正しいフォマットのカスタマーのオブジェクト
 */
export const parseBeforeUpdate = (entries: CustomerEntries, registration: any): CustomerBackend => {
	const timeArray = getDateTime()

	const updated = {
		updateBy: 1,
		updateDate: timeArray
	}

	return new CustomerBackend(entries, registration, updated)
}
