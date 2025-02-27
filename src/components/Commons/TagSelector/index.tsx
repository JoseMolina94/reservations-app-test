import { Dispatch, SetStateAction, useState } from "react";
import Tag from "../Tag";

type TagItem = {
  prop: string,
  label: string
}

type TagSelector = {
  tagsList: TagItem[],
  tagsSelected: TagItem[]
  setTagsSelected: Dispatch<SetStateAction<TagItem[]>>
  placeholder?: string
}

export default function TagSelector (props: TagSelector) {
  const { 
    tagsList,
    placeholder = 'Seleccione las tags',
    tagsSelected,
    setTagsSelected
  } = props
  const [onOpenList, setOnOpenList] = useState<boolean>(false)

  const openListFunc = () => {
    if (tagsSelected.length < tagsList.length) {
      setOnOpenList(!onOpenList)
    }
  }

  const getTagListToShow = () => {
    return tagsList.filter((tag) => {
      return !tagsSelected.some((selectedTag: TagItem) => selectedTag.prop === tag.prop);
    });
  };

  const includeTag = (tag: TagItem) => {
    setTagsSelected([...tagsSelected, tag])
    setOnOpenList(false)
  }

  const excludeTag = (tag: TagItem) => {
    const newValue = tagsSelected.filter((selectedTag: TagItem) => selectedTag.prop !== tag.prop)
    setTagsSelected(newValue)
  }

  return (
    <div className="relative">
      <div 
        onClick={() => openListFunc()}
        className="flex flex-wrap cursor-pointer gap-3 justify-center min-w-[200px] min-h-[32px] items-center border border-gray-400 px-2 py-2 rounded-md"
      >
        { tagsSelected.length > 0
          ? (
            tagsSelected.map((tag: any) => (
              <div key={`tag-prop-${tag.prop}-filter-item`} className="relative" >
                <div
                  onClick={() => excludeTag(tag)} 
                  className="text-xs absolute -top-1 -right-1.5 cursor-pointer flex justify-center items-center bg-slate-100 w-2 h-2 p-1.5 rounded-full border"
                >
                  <span>
                    x
                  </span>
                </div>
    
                <Tag
                  label={tag.label} 
                  className="bg-red-300"
                />
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-400">{placeholder}</span>
          )
        }
      </div>

      {
        onOpenList &&
          <div className="bg-white absolute z-[2] border rounded-md border-gray-400 min-w-[200px]">
            {
              getTagListToShow().map((tag: TagItem, index: number) => (
                <div
                  className="cursor-pointer hover:bg-slate-400 px-3 py-2 " 
                  key={`tag-item-${tag.label}-${index}`}
                  onClick={() => includeTag(tag)}
                >
                  {tag.label}
                </div>
              ))
            }
          </div>
      }

    </div>
  )
}