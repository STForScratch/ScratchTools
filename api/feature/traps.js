export default function () {
  return {
    vm: ScratchTools.Scratch.vm,
    blockly: ScratchTools.Scratch.blockly,
    gui: ScratchTools.Scratch.scratchGui,
    paint: ScratchTools.Scratch.scratchPaint,
    sound: ScratchTools.Scratch.scratchSound,
    blocks: ScratchTools.traps.getScratchBlocks,
  };
}
