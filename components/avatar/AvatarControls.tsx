'use client'

import { motion } from 'framer-motion'
import { Shuffle, Save, ArrowLeft } from 'lucide-react'
import ColorPicker from './ColorPicker'
import Button from '@/components/ui/Button'

interface AvatarControlsProps {
  bodyType: string
  hairStyle: string
  hairColor: string
  outfit: string
  outfitColor: string
  accessory: string
  onBodyTypeChange: (type: string) => void
  onHairStyleChange: (style: string) => void
  onHairColorChange: (color: string) => void
  onOutfitChange: (outfit: string) => void
  onOutfitColorChange: (color: string) => void
  onAccessoryChange: (accessory: string) => void
  onRandomize: () => void
  onSave: () => void
  onBack: () => void
}

/**
 * AvatarControls Component - Customization controls for avatar creation
 * Features: Body type, hair, outfit, accessories, color pickers, randomize
 */
export default function AvatarControls({
  bodyType,
  hairStyle,
  hairColor,
  outfit,
  outfitColor,
  accessory,
  onBodyTypeChange,
  onHairStyleChange,
  onHairColorChange,
  onOutfitChange,
  onOutfitColorChange,
  onAccessoryChange,
  onRandomize,
  onSave,
  onBack
}: AvatarControlsProps) {
  const bodyTypes = [
    { value: 'athletic', label: 'Athletic' },
    { value: 'average', label: 'Average' },
    { value: 'tall', label: 'Tall' }
  ]

  const hairStyles = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
  ]

  const outfits = [
    { value: 'casual', label: 'Casual' },
    { value: 'uniform', label: 'Uniform' },
    { value: 'sporty', label: 'Sporty' }
  ]

  const accessories = [
    { value: 'none', label: 'None' },
    { value: 'helmet', label: 'Helmet' },
    { value: 'flashlight', label: 'Flashlight' },
    { value: 'first-aid', label: 'First Aid Kit' },
    { value: 'map', label: 'Map' }
  ]

  const hairColors = [
    { name: 'Black', value: 'black', bgClass: 'bg-gray-900', textClass: 'text-gray-900' },
    { name: 'Brown', value: 'brown', bgClass: 'bg-amber-800', textClass: 'text-amber-800' },
    { name: 'Blonde', value: 'blonde', bgClass: 'bg-yellow-300', textClass: 'text-yellow-300' },
    { name: 'Red', value: 'red', bgClass: 'bg-red-600', textClass: 'text-red-600' },
    { name: 'Blue', value: 'blue', bgClass: 'bg-blue-600', textClass: 'text-blue-600' },
    { name: 'Purple', value: 'purple', bgClass: 'bg-purple-600', textClass: 'text-purple-600' },
    { name: 'Green', value: 'green', bgClass: 'bg-green-600', textClass: 'text-green-600' },
    { name: 'Pink', value: 'pink', bgClass: 'bg-pink-500', textClass: 'text-pink-500' }
  ]

  const outfitColors = [
    { name: 'Blue', value: 'blue', bgClass: 'bg-blue-500', textClass: 'text-blue-500' },
    { name: 'Red', value: 'red', bgClass: 'bg-red-500', textClass: 'text-red-500' },
    { name: 'Green', value: 'green', bgClass: 'bg-green-500', textClass: 'text-green-500' },
    { name: 'Yellow', value: 'yellow', bgClass: 'bg-yellow-500', textClass: 'text-yellow-500' },
    { name: 'Purple', value: 'purple', bgClass: 'bg-purple-500', textClass: 'text-purple-500' },
    { name: 'Orange', value: 'orange', bgClass: 'bg-orange-500', textClass: 'text-orange-500' },
    { name: 'Pink', value: 'pink', bgClass: 'bg-pink-500', textClass: 'text-pink-500' },
    { name: 'Gray', value: 'gray', bgClass: 'bg-gray-500', textClass: 'text-gray-500' }
  ]

  const OptionButton = ({ 
    value, 
    label, 
    isSelected, 
    onClick 
  }: { 
    value: string
    label: string
    isSelected: boolean
    onClick: () => void
  }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isSelected 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {label}
    </motion.button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Customize</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Body Type */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Body Type</label>
          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((type) => (
              <OptionButton
                key={type.value}
                value={type.value}
                label={type.label}
                isSelected={bodyType === type.value}
                onClick={() => onBodyTypeChange(type.value)}
              />
            ))}
          </div>
        </div>

        {/* Hair Style */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Hair Style</label>
          <div className="flex flex-wrap gap-2">
            {hairStyles.map((style) => (
              <OptionButton
                key={style.value}
                value={style.value}
                label={style.label}
                isSelected={hairStyle === style.value}
                onClick={() => onHairStyleChange(style.value)}
              />
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <ColorPicker
          label="Hair Color"
          selectedColor={hairColor}
          onColorChange={onHairColorChange}
          colors={hairColors}
        />

        {/* Outfit */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Outfit</label>
          <div className="flex flex-wrap gap-2">
            {outfits.map((outfitOption) => (
              <OptionButton
                key={outfitOption.value}
                value={outfitOption.value}
                label={outfitOption.label}
                isSelected={outfit === outfitOption.value}
                onClick={() => onOutfitChange(outfitOption.value)}
              />
            ))}
          </div>
        </div>

        {/* Outfit Color */}
        <ColorPicker
          label="Outfit Color"
          selectedColor={outfitColor}
          onColorChange={onOutfitColorChange}
          colors={outfitColors}
        />

        {/* Accessory */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Accessory</label>
          <div className="grid grid-cols-2 gap-2">
            {accessories.map((acc) => (
              <OptionButton
                key={acc.value}
                value={acc.value}
                label={acc.label}
                isSelected={accessory === acc.value}
                onClick={() => onAccessoryChange(acc.value)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRandomize}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Randomize
          </motion.button>

          <Button
            onClick={onSave}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Avatar
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
