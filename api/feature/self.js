export default function (id) {
  var feature = ScratchTools.Features.data.find((el) => el.id === id);
  return {
    id,
    data: feature,
    enabled: true,
    dir: ScratchTools.dir + `/features/${id}/`,
    getResource: function (resource) {
      if (!feature.resources.find((el) => el.name === resource)) return;
      return (
        ScratchTools.dir +
        `/features/${id}` +
        feature.resources.find((el) => el.name === resource).path
      );
    },
  };
}
