export interface storyItem {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  comments: commentItem[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
}

export interface commentItem {
  by: string,
  id: number,
  kids: number[],
  comments: commentItem[],
  parent: number,
  text: string,
  time: number,
  type: string,
}
