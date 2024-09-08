export const createComment = async (req, res, next) => {
try {
    const {desc,slug, parent, replyOnUser} = req.body
} catch (error) {
    next(error)
}
}