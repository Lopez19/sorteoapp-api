import Sorteo from "../models/Sorteo";

export const createSorteo = (req, res) => {
  // console.log(req.body);

  const {
    name,
    description,
    date,
    winner,
    participants,
    price,
    status,
    maxParticipants,
    imgURL,
    creator,
    reward,
  } = req.body;

  const newSorteo = new Sorteo({
    name: name,
    description: description,
    date: date,
    winner: winner,
    participants: participants,
    price: price,
    status: status,
    maxParticipants: maxParticipants,
    imgURL: imgURL,
    creator: creator,
    reward: reward,
  });

  newSorteo.save((err, sorteo) => {
    if (err) {
      return res.status(500).json({
        message: "Error al crear el sorteo",
        err,
      });
    }

    res.status(201).json({
      message: "Sorteo creado correctamente",
      sorteo,
    });
  });
};

export const getSorteos = (req, res) => {
  Sorteo.find({}, (err, sorteos) => {
    if (err) {
      return res.status(500).json({
        message: "Error al obtener los sorteos",
        err,
      });
    }

    res.status(200).json({
      message: "Sorteos obtenidos correctamente",
      sorteos,
    });
  });
};

export const getSorteoById = (req, res) => {
  const { sorteoId } = req.params;

  Sorteo.findById(sorteoId, (err, sorteo) => {
    if (err) {
      return res.status(500).json({
        message: "Error al obtener el sorteo",
        err,
      });
    }

    res.status(200).json({
      message: "Sorteo obtenido correctamente",
      sorteo,
    });
  });
};

export const updateSorteoById = (req, res) => {
  // console.log(req.body);
  // console.log(req.params);

  const { sorteoId } = req.params;

  Sorteo.findByIdAndUpdate(
    sorteoId,
    req.body,
    { new: true },
    (err, sorteoUpdated) => {
      if (err) {
        return res.status(500).json({
          message: "Error al actualizar el sorteo",
          err,
        });
      }

      res.status(204).json({
        message: "Sorteo actualizado correctamente",
        sorteoUpdated,
      });

      console.log(sorteoUpdated);
    }
  );
};

export const updateSorteoParticipants = (req, res) => {
  // console.log(req.body);
  // console.log(req.params);

  const { sorteoId } = req.params;
  const participant = req.body;

  // Verificar si el participante ya está en el sorteo
  Sorteo.findById(sorteoId, (err, sorteo) => {
    if (err) {
      return res.status(500).json({
        message: "Error al obtener el sorteo",
        err,
      });
    }

    const participantExists = sorteo.participants.find(
      (participant) => participant.id === req.body.id
    );

    if (participantExists && participantExists.id === req.body.id) {
      return res.status(400).json({
        message: "El participante ya está registrado en el sorteo",
      });
    }

    // Actualizar participantes
    Sorteo.findByIdAndUpdate(
      sorteoId,
      { $push: { participants: participant } },
      { new: true },
      (err, sorteoUpdated) => {
        if (err) {
          return res.status(500).json({
            message: "Error al actualizar el sorteo",
            err,
          });
        }

        res.status(204).json({
          message: "Sorteo actualizado correctamente",
          sorteoUpdated,
        });
      }
    );
  });
};

export const deleteSorteoById = (req, res) => {
  // console.log(req.params);

  const { sorteoId } = req.params;

  Sorteo.findByIdAndDelete(sorteoId, (err, sorteoDeleted) => {
    if (err) {
      return res.status(500).json({
        message: "Error al eliminar el sorteo",
        err,
      });
    }

    res.status(204).json({
      message: "Sorteo eliminado correctamente",
      sorteoDeleted,
    });
  });
};

// Elejir ganador
export const chooseWinner = (req, res) => {
  console.log(req.params);

  // const { sorteoId } = req.params;

  // Sorteo.findById(sorteoId, (err, sorteo) => {
  //   if (err) {
  //     return res.status(500).json({
  //       message: "Error al obtener el sorteo",
  //       err,
  //     });
  //   }

  //   const winner =
  //     sorteo.participants[
  //       Math.floor(Math.random() * sorteo.participants.length)
  //     ];

  //   Sorteo.findByIdAndUpdate(
  //     sorteoId,
  //     { winner: winner },
  //     { new: true },
  //     (err, sorteoUpdated) => {
  //       if (err) {
  //         return res.status(500).json({
  //           message: "Error al actualizar el sorteo",
  //           err,
  //         });
  //       }

  //       res.status(204).json({
  //         message: "Sorteo actualizado correctamente",
  //         sorteoUpdated,
  //       });
  //     }
  //   );
  // });
};
