/**
 * Shared PC Building Compatibility Engine
 * Used by both Next.js frontend and Express backend.
 */

export interface ComponentSpecs {
  socket?: string;
  memoryType?: 'DDR4' | 'DDR5' | string;
  formFactor?: 'ATX' | 'Micro-ATX' | 'Mini-ITX' | string;
  tdp?: number;
  wattage?: number;
  supportedSockets?: string[];
  supportedFormFactors?: string[];
  memorySlots?: number;
  maxMemoryGb?: number;
}

export interface SelectedComponents {
  cpu?: { title: string; specs: ComponentSpecs };
  motherboard?: { title: string; specs: ComponentSpecs };
  ram?: { title: string; specs: ComponentSpecs };
  gpu?: { title: string; specs: ComponentSpecs };
  psu?: { title: string; specs: ComponentSpecs };
  case?: { title: string; specs: ComponentSpecs };
  cooler?: { title: string; specs: ComponentSpecs };
  storage?: { title: string; specs: ComponentSpecs };
}

export interface CompatibilityResult {
  isCompatible: boolean;
  warnings: string[];
  errors: string[];
  totalTdp: number;
  recommendedPsuWattage: number;
}

export function checkCompatibility(components: SelectedComponents): CompatibilityResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let totalTdp = 50; // Base system draw (fans, storage, motherboard chipset)

  // 1. CPU TDP & GPU TDP Calculation
  if (components.cpu?.specs?.tdp) {
    totalTdp += Number(components.cpu.specs.tdp) || 0;
  }
  if (components.gpu?.specs?.tdp) {
    totalTdp += Number(components.gpu.specs.tdp) || 0;
  }

  const recommendedPsuWattage = Math.ceil(totalTdp * 1.25); // 25% overhead recommended

  // 2. CPU + Motherboard Socket Check
  if (components.cpu && components.motherboard) {
    const cpuSocket = components.cpu.specs?.socket;
    const mbSocket = components.motherboard.specs?.socket;

    if (cpuSocket && mbSocket && cpuSocket.toLowerCase() !== mbSocket.toLowerCase()) {
      errors.push(
        `Socket Incompatibility: CPU socket (${cpuSocket}) does not match Motherboard socket (${mbSocket}).`
      );
    }
  }

  // 3. Motherboard + RAM Memory Type Check
  if (components.motherboard && components.ram) {
    const mbMem = components.motherboard.specs?.memoryType;
    const ramMem = components.ram.specs?.memoryType;

    if (mbMem && ramMem && mbMem.toUpperCase() !== ramMem.toUpperCase()) {
      errors.push(
        `Memory Incompatibility: Motherboard supports ${mbMem}, but selected RAM is ${ramMem}.`
      );
    }
  }

  // 4. Case + Motherboard Form Factor Check
  if (components.case && components.motherboard) {
    const caseSupported = components.case.specs?.supportedFormFactors || [];
    const mbForm = components.motherboard.specs?.formFactor;

    if (mbForm && caseSupported.length > 0) {
      const isSupported = caseSupported.some(
        (ff) => ff.toLowerCase() === mbForm.toLowerCase()
      );
      if (!isSupported) {
        errors.push(
          `Form Factor Mismatch: Case does not support ${mbForm} motherboards.`
        );
      }
    }
  }

  // 5. PSU Wattage Check
  if (components.psu) {
    const psuWattage = Number(components.psu.specs?.wattage) || 0;
    if (psuWattage > 0 && psuWattage < totalTdp) {
      errors.push(
        `Power Deficit: Selected PSU (${psuWattage}W) cannot supply the required power (${totalTdp}W).`
      );
    } else if (psuWattage > 0 && psuWattage < recommendedPsuWattage) {
      warnings.push(
        `Low PSU Headroom: Selected PSU is ${psuWattage}W. Recommended is at least ${recommendedPsuWattage}W for stable operation.`
      );
    }
  }

  // 6. CPU Cooler Socket Check
  if (components.cooler && components.cpu) {
    const cpuSocket = components.cpu.specs?.socket;
    const supportedSockets = components.cooler.specs?.supportedSockets || [];

    if (cpuSocket && supportedSockets.length > 0) {
      const isSupported = supportedSockets.some(
        (s) => s.toLowerCase() === cpuSocket.toLowerCase()
      );
      if (!isSupported) {
        warnings.push(
          `Cooler Socket Caution: Verify CPU cooler bracket support for socket ${cpuSocket}.`
        );
      }
    }
  }

  return {
    isCompatible: errors.length === 0,
    warnings,
    errors,
    totalTdp,
    recommendedPsuWattage,
  };
}
