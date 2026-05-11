CREATE MIGRATION m1aa4xj3ykcoedajhkacc44kcalf5r344guq7hqjurcm47gksrezmq
    ONTO m1fwkm6povady6pa2pmwtiqqdytjcdjzdi52oio67wqopdmfj7qjaq
{
  ALTER TYPE default::Image {
      DROP PROPERTY url;
  };
};
