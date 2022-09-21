class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :short_description, :genre, :platform, :publisher, :developer, :release_date, :thumbnail
end