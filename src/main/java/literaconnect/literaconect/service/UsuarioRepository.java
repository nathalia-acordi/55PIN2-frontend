package literaconnect.literaconect.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import literaconnect.literaconect.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findByNomeUsuario(String nomeUsuario);

	Optional<Usuario> findByEmail(String email);
}
