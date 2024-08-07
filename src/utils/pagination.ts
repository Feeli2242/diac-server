export const pagination = async <T>(
	model: any, // modelo de prisma
	page: number,
	pageSize: number,
	where: object = {}
): Promise<{
	data: T[]
	total: number
	page: number
	pageSize: number
	totalPages: number
}> => {
	const [data, total] = await Promise.all([
		model.findMany({
			where,
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize),
		}),
		model.count({ where }),
	])
	const totalPages = Math.ceil(total / pageSize)
	// const totalPages = 5
	return {
		page: Number(page),
		pageSize: Number(pageSize),
		totalPages,
		total,
		data,
	}
}
