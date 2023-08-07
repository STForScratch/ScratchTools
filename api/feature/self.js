export default function (id) {
  var feature = ScratchTools.Features.data.find((el) => el.id === id);
  return {
    id,
    data: feature,
    dir: ScratchTools.dir + `/features/${id}/`,
  };
}
