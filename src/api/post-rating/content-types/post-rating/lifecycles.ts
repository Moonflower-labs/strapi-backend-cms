export default {
  async afterCreate(event) {
    console.log("afterCreate");
    await updateAverageRating(event);
  },
  async afterUpdate(event) {
    console.log("afterUpdate");
    await updateAverageRating(event);
  },
  async afterDelete(event) {
    console.log("afterDelete");
    await updateAverageRating(event);
  },
};

async function updateAverageRating(event) {
  const postId = event.params?.data?.post?.set
    ? event.params.data.post.set[0].id
    : null;

  const { data } = event.params;
  console.dir(event.params, { depth: Infinity });
  if (!postId) {
    console.warn("No valid post ID found for rating.");
    return; // Exit if no post ID is found
  }
  const ratings = await strapi
    .documents("api::post-rating.post-rating")
    .findMany({
      filters: { post: postId },
      populate: { post: true },
    });
  console.log("Fetched Ratings:", ratings);

  const average_rating =
    ratings.length > 0
      ? parseFloat(
          (
            ratings.reduce((acc, rating) => acc + rating.value, 0) /
            ratings.length
          ).toFixed(2)
        )
      : 0;

  console.log("Calculated Average Rating:", average_rating);

  const update = await strapi.documents("api::post.post").update({
    documentId: ratings?.[0]?.post?.documentId,
    status: "published",
    data: { average_rating: average_rating },
  });
  console.log("after update", update);
}
