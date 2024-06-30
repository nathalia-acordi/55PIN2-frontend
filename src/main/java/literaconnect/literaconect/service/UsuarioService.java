package literaconnect.literaconect.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import literaconnect.literaconect.model.Usuario;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repositorio;
	
	public void salvarUsuario(Usuario usuario) {
		repositorio.save(usuario);
	}
	
	public boolean isExisteNomeUsuarioCadastrado(String nomeUsuario) {
		Optional<Usuario> usuario = repositorio.findByNomeUsuario(nomeUsuario);
		return  usuario.isPresent();
	}

	//sempre usar isPresent() quando usamos isExisteEmailCadastrado
	public boolean isExisteEmailCadastrado(String email) {
		Optional<Usuario> usuario = repositorio.findByEmail(email);
		return  usuario.isPresent();
	}

	public boolean obterUsuarioCadastrado(String email, String senha) {
		Optional<Usuario> optionalUsuario = repositorio.findByEmail(email);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            return usuario.checkSenha(senha);
        }
        return false;
	}
}
