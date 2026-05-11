CREATE MIGRATION m1fwkm6povady6pa2pmwtiqqdytjcdjzdi52oio67wqopdmfj7qjaq
    ONTO initial
{
  CREATE FUTURE no_linkful_computed_splats;
  CREATE TYPE default::BlogPost {
      CREATE PROPERTY content: std::str;
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY subtitle: std::str;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY updatedAt: std::datetime;
  };
  CREATE TYPE default::Image {
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY updatedAt: std::datetime;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Video {
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY updatedAt: std::datetime;
      CREATE PROPERTY url: std::str;
  };
};
